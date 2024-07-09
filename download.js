const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const { stdout, stderr } = await execAsync(`youtube-dl -g ${url}`);
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    return res.status(200).json({ url: stdout.trim() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
