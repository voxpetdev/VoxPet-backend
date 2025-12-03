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
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
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
INSERT INTO `__new_users`("userID", "name", "last_name", "email", "documentType", "document", "roleID", "specialtyID", "phone", "address", "createdAt", "updatedAt") SELECT "userID", "name", "last_name", "email", "documentType", "document", "roleID", "specialtyID", "phone", "address", "createdAt", "updatedAt" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);