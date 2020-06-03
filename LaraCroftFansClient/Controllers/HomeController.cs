using LaraCroftFansClient.Models;
using System;
using System.Linq;
using System.Web.Mvc;
using System.Data.Entity;
using System.Text.RegularExpressions;

namespace LaraCroftFansClient.Controllers
{
    public class HomeController : Controller
    {
        private DB_A37A16_zaghiniEntities db = new DB_A37A16_zaghiniEntities();

        public ActionResult Index()
        {
            ViewBag.Title = "Lara Croft Fans";

            var posts = db.posts.Include(p => p.tags).Include(p => p.users);

            var retorno = posts.ToList().Where(x => x.active == true).OrderByDescending(x => x.postdate).Take(6);

            foreach (var item in retorno)
            {
                item.content = StripHTML(item.content).Substring(0, 30);
            }

            return View(retorno);
        }

        public ActionResult Filter()
        {
            return View();
        }

        [HttpPost]
        public JsonResult LoadInitialPosts(string action)
        {
            int pageNumber;

            if (Session["ActualPage"] != null)
                pageNumber = Convert.ToInt32(Session["ActualPage"].ToString());
            else
                pageNumber = 0;

            if (action == "Home")
                pageNumber = 0;
            else if (action == "Next")
                pageNumber++;
            else if (action == "Previous")
                pageNumber--;

            Session["ActualPage"] = pageNumber;

            var posts = (from p in db.posts
                         join t in db.tags on p.idtag equals t.id
                         where p.active == true
                         orderby p.postdate descending
                         select new PostsDTO
                         {
                             idpost = p.id,
                             title = p.title,
                             name = p.users.name,
                             iduser = p.users.id,
                             postdate = p.postdate,
                             image = p.image,
                             description = t.description,
                             page = pageNumber,
                             content = p.content
                         }
                ).Skip(5 * pageNumber).Take(6).ToList();


            foreach (var item in posts)
            {
                item.content = StripHTML(item.content).Substring(0, 50);
            }

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
                         select new PostsDTO
                         {
                             idpost = p.id,
                             title = p.title,
                             name = p.users.name,
                             iduser = p.users.id,
                             postdate = p.postdate,
                             image = p.image,
                             description = t.description,
                             content = p.content,
                             tagId = t.id
                         }).ToList();

            foreach (var item in posts)
            {
                item.content = StripHTML(item.content).Substring(0, 30);
            }
            JsonResult json = Json(posts);

            return json;
        }

        public string StripHTML(string input)
        {
            return Regex.Replace(input, "<.*?>", String.Empty).Replace("&nbsp;", " ");
        }

        [HttpPost]
        public void SetSectionFilter(int id)
        {
            Session["idTag"] = id;
        }

    }
}