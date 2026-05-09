CREATE TABLE `quests` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`type` text NOT NULL,
	`goal_type` text NOT NULL,
	`goal_value` integer NOT NULL,
	`reward_exp` integer NOT NULL,
	`reward_coins` integer NOT NULL,
	`icon` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_quests` (
	`user_id` integer NOT NULL,
	`quest_id` text NOT NULL,
	`last_claimed_at` text,
	PRIMARY KEY(`user_id`, `quest_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`quest_id`) REFERENCES `quests`(`id`) ON UPDATE no action ON DELETE no action
);
