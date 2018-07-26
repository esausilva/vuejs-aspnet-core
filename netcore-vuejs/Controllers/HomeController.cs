using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using netcore_vuejs.Models;

namespace netcore_vuejs.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult SubmitedForm([FromBody] FormViewModel form) 
        {
            string message = "";

            // Insert to database, send email, etc

            return Json(new { message });
        }
    }
}
