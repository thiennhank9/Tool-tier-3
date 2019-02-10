use master

create database ToolTier3Db

go
use ToolTier3Db
go

create table Users
(
	Id int primary key IDENTITY(0, 1),
	Username nvarchar(50) UNIQUE,
	Password nvarchar(50),
	IsAdmin bit,
	CanAccessDW bit,
	CanAccessHHAX bit
)

create table Connections
(
	Id int primary key IDENTITY(0, 1),
	ConnectionName nvarchar(50) UNIQUE,
	ConnectionType nvarchar(50),
	ServerName nvarchar(50),
	DatabaseName nvarchar(50),
	DatabaseUsername nvarchar(50),
	DatabasePassword nvarchar(50)
)

-- Inserts

insert into Users values ('kmsadmin', 'kmsadmin', 1, 1, 1)
insert into Users values ('kmsuser1', 'kmsuser1', 0, 1, 1)
insert into Users values ('kmsuser2', 'kmsuser2', 0, 1, 0)
insert into Users values ('kmsuser3', 'kmsuser3', 0, 0, 1)
