const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, 
    lowercase: true, 
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  stats: {
  activeProjects: { type: Number, default: 0 },    // Projects currently in progress
  totalTasksAssigned: { type: Number, default: 0 }, // Lifetime tasks given to user
  completedTasks: { type: Number, default: 0 },    // Successfully finished tasks
  overdueTasks: { type: Number, default: 0 },      // Tasks missed by the deadline
  totalHoursLogged: { type: Number, default: 0 },   // For time-tracking/billing
  efficiencyScore: { type: Number, default: 100 }, // Calculated metric (e.g., tasks done vs. deadlines)
  lastActivityDate: { type: Date, default: Date.now }
},
  isVerified: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  }
});

// Added Index for Leaderboard Performance
UserSchema.index({ "stats.totalPoints": -1 });

const User = mongoose.model('User', UserSchema);
module.exports = User