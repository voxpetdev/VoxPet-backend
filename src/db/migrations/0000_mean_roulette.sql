CREATE TABLE `roles` (
	`roleID` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `specialties` (
	`specialtyID` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`userID` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`documentType` text,
	`document` integer,
	`roleID` text NOT NULL,
	`specialtyID` text NOT NULL,
	`phone` text NOT NULL,
	`address` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`roleID`) REFERENCES `roles`(`roleID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`specialtyID`) REFERENCES `specialties`(`specialtyID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);