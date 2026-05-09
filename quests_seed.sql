-- Daily Quests
INSERT INTO quests (id, title, description, type, goal_type, goal_value, reward_exp, reward_coins, icon) VALUES 
('daily_tasks_3', 'The Morning Routine', 'Complete 3 tasks today', 'daily', 'tasks', 3, 50, 100, '📜'),
('daily_focus_60', 'Deep Work Session', 'Focus for 60 minutes', 'daily', 'minutes', 60, 100, 250, '⏱️'),
('daily_tasks_5', 'High Productivity', 'Complete 5 tasks today', 'daily', 'tasks', 5, 150, 400, '🔥');

-- Weekly Quests
INSERT INTO quests (id, title, description, type, goal_type, goal_value, reward_exp, reward_coins, icon) VALUES 
('weekly_tasks_15', 'Weekly Warrior', 'Complete 15 tasks this week', 'weekly', 'tasks', 15, 500, 1000, '⚔️'),
('weekly_focus_300', 'Study Marathon', 'Focus for 300 minutes this week', 'weekly', 'minutes', 300, 800, 2000, '📚'),
('weekly_tasks_30', 'Grand Master', 'Complete 30 tasks this week', 'weekly', 'tasks', 30, 1500, 5000, '👑');
