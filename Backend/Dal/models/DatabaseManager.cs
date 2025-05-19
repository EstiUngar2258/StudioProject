using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Dal.models
{
    public partial class DatabaseManager : DbContext
    {
        public DatabaseManager()
        {
        }

        public DatabaseManager(DbContextOptions<DatabaseManager> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<FreeQueue> FreeQueues { get; set; }
        public virtual DbSet<FullQueue> FullQueues { get; set; }
        public virtual DbSet<StudioService> StudioServices { get; set; }
        public virtual DbSet<Worker> Workers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Clients__3214EC07BDE37F28");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<FreeQueue>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC073A159696");

                entity.ToTable("FreeQueue");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Worker).WithMany(p => p.FreeQueues)
                    .HasForeignKey(d => d.WorkerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FreeQueue__Worke__47DBAE45");
            });

            modelBuilder.Entity<FullQueue>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__FullQueu__3214EC07B5831093");

                entity.ToTable("FullQueue");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.ClientId).HasColumnName("ClientID");
                entity.Property(e => e.ServiceId).HasColumnName("ServiceID");
                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Client).WithMany(p => p.FullQueues)
                    .HasForeignKey(d => d.ClientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FullQueue__Clien__49C3F6B7");

                entity.HasOne(d => d.Service).WithMany(p => p.FullQueues)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FullQueue__Servi__4AB81AF0");

                entity.HasOne(d => d.Worker).WithMany(p => p.FullQueues)
                    .HasForeignKey(d => d.WorkerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FullQueue__Worke__48CFD27E");
            });

            modelBuilder.Entity<StudioService>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__StudioSe__3214EC07F03F862E");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Description).HasColumnType("text");
                entity.Property(e => e.ServiceName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ServiceName ");
            });

            modelBuilder.Entity<Worker>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Workers__3214EC07F57D0C6C");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.SalaryForHour).HasColumnType("money");
                entity.Property(e => e.WorkerType)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
