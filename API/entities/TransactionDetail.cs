using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.entities
{
  [Table(nameof(TransactionDetail))]
  public class TransactionDetail
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int TransId { get; set; }
    [Required]
    public int AccId { get; set; }
    [Required]
    public double TransMoney { get; set; }
    [Required]
    public int TransType { get; set; }
    public DateTime DateOfTrans { get; set; }
    [ForeignKey("AccId")]
    [InverseProperty("TransactionDetails")]
    public virtual Account Account { get; set; }

  }
}