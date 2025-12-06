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
	`specialtyID` text,
	`phone` text NOT NULL,
	`address` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`roleID`) REFERENCES `roles`(`roleID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`specialtyID`) REFERENCES `specialties`(`specialtyID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `specie` (
	`specieID` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `breed` (
	`breedID` integer PRIMARY KEY NOT NULL,
	`specieID` integer NOT NULL,
	`name` text NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`specieID`) REFERENCES `specie`(`specieID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pet` (
	`petID` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`last_name` text,
	`weight` real NOT NULL,
	`birthday` text NOT NULL,
	`breedID` integer NOT NULL,
	`genre` text NOT NULL,
	`color` text,
	`status` text DEFAULT 'ACTIVE',
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
	`userID` text NOT NULL,
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
