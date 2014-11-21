using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace fakeServerApp.Controllers
{
    public class HomeController : Controller
    {

        //Don't do this at home!
        
        private class Order
        {
            public int ID { get; set; }
            public string Numerator { get; set; }
            public double Price { get; set; }
        }

        private List<Order> _orders = new List<Order>
            {
                new Order {ID = 1, Numerator = "Pierwszy", Price = 1.1d},
                new Order {ID = 2, Numerator = "Drugi", Price = 2.2d},
                new Order {ID = 3, Numerator = "Trzeci", Price = 3.3d},
                new Order {ID = 4, Numerator = "Czwarty", Price = 4.4d},
                new Order {ID = 5, Numerator = "Piąty", Price = 5.5d},
                new Order {ID = 6, Numerator = "Szósty", Price = 6.6d},
                new Order {ID = 7, Numerator = "Siódmy", Price = 7.7d},
                new Order {ID = 8, Numerator = "Ósmy", Price = 8.8d}
            };

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public JsonResult Orders()
        {
            var rand = System.Web.HttpContext.Current.Application["random"] as Random;
            if (rand == null)
            {
                rand = new Random(123141231);
            }

            System.Web.HttpContext.Current.Application.Add("random", rand);
            var sleepingTime = rand.Next(2000, 10000);

            Thread.Sleep(sleepingTime);
            
            return Json(_orders.Select(o => new
            {
                id = o.ID,
                numerator = o.Numerator,
                price = o.Price
            }), JsonRequestBehavior.AllowGet);

        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}