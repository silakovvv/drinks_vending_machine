﻿// <auto-generated />
using System;
using DrinksVendingMachine.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DrinksVendingMachine.Data.Migrations
{
    [DbContext(typeof(VendingMachineContext))]
    [Migration("20211111145852_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DrinksVendingMachine.Data.Models.Coin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Cost")
                        .HasColumnType("decimal(18,2)");

                    b.Property<bool>("Locked")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SchortName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Coin");
                });

            modelBuilder.Entity("DrinksVendingMachine.Data.Models.CoinTransaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("CoinId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ProcessingDate")
                        .HasColumnType("datetime2");

                    b.HasKey("TransactionId");

                    b.HasIndex("CoinId");

                    b.ToTable("CoinTransaction");
                });

            modelBuilder.Entity("DrinksVendingMachine.Data.Models.Drink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("Drink");
                });

            modelBuilder.Entity("DrinksVendingMachine.Data.Models.VendingMachineOperation", b =>
                {
                    b.Property<int>("OperationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int>("DrinkId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ProcessingDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Sum")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("OperationId");

                    b.HasIndex("DrinkId");

                    b.ToTable("VendingMachineOperation");
                });

            modelBuilder.Entity("DrinksVendingMachine.Data.Models.CoinTransaction", b =>
                {
                    b.HasOne("DrinksVendingMachine.Data.Models.Coin", "CoinLink")
                        .WithMany("Transactions")
                        .HasForeignKey("CoinId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CoinLink");
                });

            modelBuilder.Entity("DrinksVendingMachine.Data.Models.VendingMachineOperation", b =>
                {
                    b.HasOne("DrinksVendingMachine.Data.Models.Drink", "DrinkLink")
                        .WithMany("Operations")
                        .HasForeignKey("DrinkId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DrinkLink");
                });

            modelBuilder.Entity("DrinksVendingMachine.Data.Models.Coin", b =>
                {
                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("DrinksVendingMachine.Data.Models.Drink", b =>
                {
                    b.Navigation("Operations");
                });
#pragma warning restore 612, 618
        }
    }
}
