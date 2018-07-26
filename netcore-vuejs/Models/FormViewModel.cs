using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace netcore_vuejs.Models
{
    public class FormViewModel
    {
        public FormFields Fields { get; set; }
    }

    public class FormFields
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Comments { get; set; }
    }
}
