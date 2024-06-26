﻿// <auto-generated />
using System;
using API.entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AccountBankContext))]
    [Migration("20240617043412_update_database_v1")]
    partial class update_database_v1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("API.entities.Account", b =>
                {
                    b.Property<int>("AccId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AccId"));

                    b.Property<double>("Balance")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("float")
                        .HasDefaultValue(0.0);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("AccId")
                        .HasName("PK_Account");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasDatabaseName("IX_Email");

                    b.HasIndex("Phone")
                        .IsUnique()
                        .HasDatabaseName("IX_Phone");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasDatabaseName("IX_Username");

                    b.ToTable("Account");
                });

            modelBuilder.Entity("API.entities.TransactionDetail", b =>
                {
                    b.Property<int>("TransId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TransId"));

                    b.Property<int>("AccId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfTrans")
                        .HasColumnType("datetime2");

                    b.Property<double>("TransMoney")
                        .HasColumnType("float");

                    b.Property<int>("TransType")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(1);

                    b.HasKey("TransId")
                        .HasName("PK_TransactionDetail");

                    b.HasIndex("AccId");

                    b.ToTable("TransactionDetail", t =>
                        {
                            t.HasCheckConstraint("CK_TransactionDetail_TransType", "[TransType] IN (1, 2)");
                        });
                });

            modelBuilder.Entity("API.entities.TransactionDetail", b =>
                {
                    b.HasOne("API.entities.Account", "Account")
                        .WithMany("TransactionDetails")
                        .HasForeignKey("AccId")
                        .IsRequired()
                        .HasConstraintName("FK_TransactionDetail_Account");

                    b.Navigation("Account");
                });

            modelBuilder.Entity("API.entities.Account", b =>
                {
                    b.Navigation("TransactionDetails");
                });
#pragma warning restore 612, 618
        }
    }
}
