using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.entities
{
  [Table("Account")]
  public class Account
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int AccId { get; set; }
    [Required]
    [StringLength(255)]
    public string Username { get; set; }
    [Required]
    [StringLength(255)]
    public string Password { get; set; }
    [Required]
    [StringLength(255)]
    public string FullName { get; set; }
    [Required]
    [StringLength(255)]
    public string Email { get; set; }
    [Required]
    [StringLength(255)]
    public string Phone { get; set; }

    public double Balance { get; set; } = 0;
    [InverseProperty("Account")]
    public virtual ICollection<TransactionDetail> TransactionDetails { get; set; } = [];

  }
}