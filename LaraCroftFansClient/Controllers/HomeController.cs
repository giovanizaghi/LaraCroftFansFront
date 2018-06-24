using LaraCroftFansClient.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace LaraCroftFansClient.Controllers
{
    public class HomeController : Controller
    {
        private DB_A37A16_zaghiniEntities db = new DB_A37A16_zaghiniEntities();

        public ActionResult Index()
        {
            ViewBag.Title = "Lara Croft Fans";

            var posts = db.posts.Include(p => p.tags).Include(p => p.users);

            var retorno = posts.ToList().Where(x => x.active == true).OrderByDescending(x => x.postdate).Take(5);

            foreach (var item in retorno)
            {
                item.content = StripHTML(item.content);
            }

            return View(retorno);
        }

        public ActionResult Filter()
        {
            return View();
        }

        [HttpPost]
        public JsonResult LoadInitialPosts()
        {
            var posts = (from p in db.posts
                         join t in db.tags on p.idtag equals t.id
                         where p.active == true
                         orderby p.postdate descending
                         select new
                         {
                             idpost = p.id,
                             p.title,
                             p.users.name,
                             iduser = p.users.id,
                             p.postdate,
                             p.image,
                             t.description
                         }

                ).ToList().Take(10);

            JsonResult json = Json(posts);

            return json;
        }

        [HttpPost]
        public JsonResult LoadInterviews(int id)
        {
            var posts = (from p in db.posts
                         join t in db.tags on p.idtag equals t.id
                         where t.id == id && p.id != id && p.active == true
                         select new
                         {
                             p.title,
                             p.image,
                             p.id
                         }).ToList().Take(3);

            JsonResult json = Json(posts);

            return json;
        }

        [HttpPost]
        public JsonResult LoadByTag(int id)
        {
            var posts = (from p in db.posts
                         join t in db.tags on p.idtag equals t.id
                         where t.id == id && p.active == true
                         orderby p.postdate descending
                         select new
                         {
                             idpost = p.id,
                             p.title,
                             p.users.name,
                             iduser = p.users.id,
                             p.postdate,
                             p.image,
                             t.description
                         }).ToList();

            JsonResult json = Json(posts);

            return json;
        }

        public string StripHTML(string input)
        {
            return Regex.Replace(input, "<.*?>", String.Empty);
        }

        [HttpPost]
        public void SetSectionFilter(int id)
        {
            Session["idTag"] = id;
        }

    }
}