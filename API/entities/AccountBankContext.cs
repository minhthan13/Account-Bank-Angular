using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.entities
{
  public class AccountBankContext : DbContext
  {
    public AccountBankContext(DbContextOptions<AccountBankContext> options) : base(options)
    {
    }
    public AccountBankContext() { }
    public DbSet<Account> Accounts { get; set; }
    public DbSet<TransactionDetail> TransactionDetails { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      // account table
      modelBuilder.Entity<Account>(account =>
      {
        account.HasKey(x => x.AccId).HasName("PK_Account");
        account.Property(x => x.AccId)
                .ValueGeneratedOnAdd();
        account.HasIndex(x => x.Username)
            .IsUnique()
            .HasDatabaseName("IX_Username");
        account.HasIndex(x => x.Email)
            .IsUnique()
            .HasDatabaseName("IX_Email");
        account.HasIndex(x => x.Phone)
            .IsUnique()
            .HasDatabaseName("IX_Phone");

        account.Property(x => x.Balance)
             .HasDefaultValue(0);
      });
      // transactionDetail table
      modelBuilder.Entity<TransactionDetail>(transactionDetail =>
        {
          transactionDetail.HasKey(x => x.TransId).HasName("PK_TransactionDetail");

          transactionDetail.Property(x => x.TransId)
                  .ValueGeneratedOnAdd();

          transactionDetail.HasOne(td => td.Account)
                  .WithMany(a => a.TransactionDetails)
                  .HasForeignKey(td => td.AccId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_TransactionDetail_Account");
        });

    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      base.OnConfiguring(optionsBuilder);
    }
  }
}