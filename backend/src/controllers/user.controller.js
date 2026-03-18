import User from "../models/User.model.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateProfile = async (req, res) => {  
  console.log(req.body)
  const user = await User.findById(req.user.id);
  
  if (req.body.budget !== undefined) {
    const newBudget = Number(req.body.budget);
    if (!user.remainingBudget && user.remainingBudget !== 0) {
      req.body.remainingBudget = newBudget;
    } else if (user.budget !== newBudget) {
      // Adjust remaining budget by the difference in total budget
      const diff = newBudget - (user.budget || 0);
      req.body.remainingBudget = (user.remainingBudget || 0) + diff;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );
  res.json(updatedUser);
};
