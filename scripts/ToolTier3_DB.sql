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

insert into Connections values ('con1', 'Warehouse', 'sv1', 'db1', 'user1', 'pass1')
insert into Connections values ('con2', 'Warehouse', 'sv2', 'db2', 'user2', 'pass2')
insert into Connections values ('con3', 'Warehouse', 'sv3', 'db3', 'user3', 'pass3')
insert into Connections values ('con4', 'Warehouse', 'sv4', 'db4', 'user4', 'pass4')
insert into Connections values ('con5', 'HHAX', 'sv5', 'db5', 'user5', 'pass5')
insert into Connections values ('con6', 'HHAX', 'sv46', 'db6', 'user6', 'pass6')