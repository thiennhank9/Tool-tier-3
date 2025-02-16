﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Tier3Tool.Models;

namespace Tier3Tool.Migrations
{
    [DbContext(typeof(ToolTier3DbContext))]
    partial class ToolTier3DbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Tier3Tool.Models.Connections", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConnectionName")
                        .HasMaxLength(50);

                    b.Property<string>("ConnectionType")
                        .HasMaxLength(50);

                    b.Property<string>("DatabaseName")
                        .HasMaxLength(50);

                    b.Property<string>("DatabasePassword")
                        .HasMaxLength(50);

                    b.Property<string>("DatabaseUsername")
                        .HasMaxLength(50);

                    b.Property<string>("ServerName")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("ConnectionName")
                        .IsUnique()
                        .HasName("UQ__Connecti__38090CF9505F0640")
                        .HasFilter("[ConnectionName] IS NOT NULL");

                    b.ToTable("Connections");
                });

            modelBuilder.Entity("Tier3Tool.Models.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("CanAccessDw")
                        .HasColumnName("CanAccessDW");

                    b.Property<bool?>("CanAccessHhax")
                        .HasColumnName("CanAccessHHAX");

                    b.Property<bool?>("IsAdmin");

                    b.Property<string>("Password")
                        .HasMaxLength(50);

                    b.Property<string>("Username")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasName("UQ__Users__536C85E4F3745627")
                        .HasFilter("[Username] IS NOT NULL");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
