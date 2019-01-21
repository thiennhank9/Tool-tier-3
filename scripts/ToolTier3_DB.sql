use master
create database ToolTier3
create table Accounts 
(
	Id int primary key,
	Username nvarchar(50),
	Password nvarchar(50),
	IsAdmin bit,
	CanAccessWarehouse bit,
	CanAccessHHAX bit
)
create table Connections
(
	Id int primary key,
	ConnectionType int,
	ServerName nvarchar(50),
	DatabaseName nvarchar(50),
	Username nvarchar(50),
	Password nvarchar(50)
)
create table PairConnections
(
	ID int primary key,
	PairConnectionType int,
	PairConnectionName nvarchar(50),
	Connection1Id int foreign key references Connections(Id),
	Connection2Id int foreign key references Connections(Id),
) 
