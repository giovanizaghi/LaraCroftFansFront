//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LaraCroftFansClient.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class section
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public section()
        {
            this.sectionitem = new HashSet<sectionitem>();
        }
    
        public int id { get; set; }
        public string description { get; set; }
        public Nullable<int> defaultItem { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<sectionitem> sectionitem { get; set; }
        public virtual sectionitem sectionitem1 { get; set; }
    }
}
