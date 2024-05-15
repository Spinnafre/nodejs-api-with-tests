import { describe, test, expect } from '@jest/globals'
import crypto from 'crypto'


describe("Create user invitation code", () => {
  function validateHash(inputData: string, storedHash: string, storedSalt: string, iterations: number, keylen: number, digest: string) {
    // Generate the hash with the input data and the stored salt
    const derivedKey = crypto.pbkdf2Sync(inputData, storedSalt, iterations, keylen, digest);

    // Convert to hex format for comparison
    const hash = derivedKey.toString('hex');

    // Compare the newly generated hash with the stored hash
    // Return true if they match, false otherwise
    return hash === storedHash;
  }

  async function generateHash(userEmail: string, salt: string, iterations: number, keylen: number, digest: string): Promise<Error | string> {
    // Asynchronously generate the hash
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(userEmail, salt, iterations, keylen, digest, (err, derivedKey) => {
        if (err) reject(err);
        // The derivedKey is the hash code generated from the user's email and the salt
        const hash = derivedKey.toString('hex');
        resolve(hash)
      });
    })
  }

  const salt = "89af61e3502242626b5ea5f54199126e"

  const iterations = 100;
  const keylen = 10;
  const digest = 'sha512';

  test("Given an email then should be able to create code using base64 and create a hash", async () => {
    // User email to be encoded
    const userEmail = 'u@example.com';

    // Generate a random salt
    // const salt = crypto.randomBytes(16).toString('hex'); // The salt stored in the database

    // Number of iterations

    // Desired key length

    // Digest algorithm

    const userHash = await generateHash(userEmail, salt, iterations, keylen, digest) // The hash stored in the database

    console.log("generated hash :: ", userHash, ' -> ', (userHash as string).length);


    const isValid = validateHash('user2@example.com', userHash as string, salt, iterations, keylen, digest);

    console.log("Is valid code ? ", isValid);

  });

  test("Given a hash code then should be able to validate", () => {

  });
});
