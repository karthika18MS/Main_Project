import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const predictBudget = async (req, res) => {
  try {
    const scriptPath = path.join(__dirname, "../ai/predict.py");
    const input = JSON.stringify(req.body);

    execFile(
      "python",
      [scriptPath, input],
      { timeout: 20000 },
      (error, stdout, stderr) => {
        if (error) {
          console.error("AI Error:", stderr || error.message);
          return res
            .status(500)
            .json({ message: "AI prediction failed" });
        }

        try {
          const result = JSON.parse(stdout);
          res.status(200).json(result);
        } catch {
          res
            .status(500)
            .json({ message: "Invalid AI response format" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const predictVendor = async (req, res) => {

  const vendors = req.body.vendors;

  const response = await axios.post(
    "http://127.0.0.1:8000/predict",
    { vendors }
  );

  res.json(response.data);

};