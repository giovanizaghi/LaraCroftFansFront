using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using LaraCroftFansClient.Models;

namespace LaraCroftFansClient.Controllers
{
    public class sectionsController : Controller
    {
        private DB_A37A16_zaghiniEntities db = new DB_A37A16_zaghiniEntities();



        // GET: sections/Details/5
        public ActionResult ViewSection(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            int idSection = (from i in db.sectionitem
                             join s in db.section on i.idsection equals s.id
                             where i.id == id
                             select s.id).FirstOrDefault();

            section section = db.section.Find(idSection);

            if (section == null)
            {
                return HttpNotFound();
            }

            var sectionItemDefault = (from i in db.sectionitem where i.id == id select i).FirstOrDefault();

            var allItems = (from i in db.sectionitem where i.idsection == idSection select i).ToList();


            ViewBag.sectionItemDefault = sectionItemDefault;
            ViewBag.allItems = allItems;

            return View(section);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
