// This file patches zod to add the base64 function to ZodString
// It should be imported at the top of any file that uses zod

// Import zod
const zod = require('zod');

// Get the ZodString prototype
const ZodString = zod.string().constructor;

// Add the base64 function if it doesn't exist
if (!ZodString.prototype.base64) {
  ZodString.prototype.base64 = function () {
    // Simple base64 regex validation
    const regex = /^[A-Za-z0-9+/]*={0,2}$/;

    return this.refine(
      (val) => {
        if (typeof val !== 'string') return false;
        return regex.test(val);
      },
      { message: 'Invalid base64 string' },
    );
  };
}

// Export zod to make it available
module.exports = zod;
