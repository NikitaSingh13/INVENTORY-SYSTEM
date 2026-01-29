export default async function handler(req, res) {
  try {
    await fetch('https://inventory-system-yp9n.onrender.com/health');
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}
