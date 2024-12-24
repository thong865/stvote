import {
    HashDriverContract,
    ManagerDriverFactory
} from '@adonisjs/core/types/hash'

/**
 * Config accepted by the hash driver
 */
export type PbkdfConfig = {
}

/**
 * Driver implementation
 */
export class Pbkdf2Driver implements HashDriverContract {
    constructor(public config: PbkdfConfig) {
    }

    /**
     * Check if the hash value is formatted as per
     * the hashing algorithm.
     */
    isValidHash(value: string): boolean {
        return true
    }

    /**
     * Convert raw value to Hash
     */
    async make(value: string): Promise<string> {
        return value
    }

    /**
     * Verify if the plain value matches the provided
     * hash
     */
    async verify(
        hashedValue: string,
        plainValue: string
    ): Promise<boolean> {
        return true
    }

    /**
     * Check if the hash needs to be re-hashed because
     * the config parameters have changed
     */
    needsReHash(value: string): boolean {
        return true;
    }
}

/**
 * Factory function to reference the driver
 * inside the config file.
 */
export function pbkdf2Driver(config: PbkdfConfig): ManagerDriverFactory {
    return () => {
        return new Pbkdf2Driver(config)
    }
}
