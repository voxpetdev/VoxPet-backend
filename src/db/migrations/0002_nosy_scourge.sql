CREATE TABLE `pet` (
	`petID` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`last_name` text,
	`weight` real NOT NULL,
	`birthday` text NOT NULL,
	`breedID` integer NOT NULL,
	`genre` text NOT NULL,
	`color` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`breedID`) REFERENCES `breed`(`breedID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users_pets` (
	`users_petsID` integer PRIMARY KEY NOT NULL,
	`userID` integer NOT NULL,
	`petID` integer NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`petID`) REFERENCES `pet`(`petID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `appointments` (
	`appointmentID` integer PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`consultation` text,
	`place` text,
	`observations` text,
	`petID` integer NOT NULL,
	`userID` integer NOT NULL,
	`status` text NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`petID`) REFERENCES `pet`(`petID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medical_history` (
	`medical_historyID` integer PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`record_number` text NOT NULL,
	`reason` text,
	`description` text,
	`petID` integer NOT NULL,
	`observations` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`petID`) REFERENCES `pet`(`petID`) ON UPDATE no action ON DELETE no action
);
