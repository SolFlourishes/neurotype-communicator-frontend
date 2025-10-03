import pkg from '@getbrevo/brevo';

export default async function handler(req, res) {
  console.log('--- STARTING FINAL DIAGNOSTIC ---');

  // This will print the exact structure of the imported library to the logs.
  console.dir(pkg, { depth: null });

  console.log('--- DIAGNOSTIC COMPLETE ---');

  // We are returning a success message here to prevent the function from crashing.
  return res.status(200).json({ message: 'Diagnostic complete. Please check the Vercel logs.' });
}