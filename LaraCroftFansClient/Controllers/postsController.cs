using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using LaraCroftFansClient.Models;
using Newtonsoft.Json;

namespace LaraCroftFansClient.Controllers
{
    public class postsController : Controller
    {
        private DB_A37A16_zaghiniEntities db = new DB_A37A16_zaghiniEntities();

        public ActionResult ViewPost(int? id)
        {

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            posts posts = db.posts.Find(id);
            if (posts == null)
            {
                return HttpNotFound();
            }

            ViewBag.Title = posts.title;
            ViewBag.PostUrl = "http://www.laracroftfans.com/Posts/ViewPost/" + id;
            ViewBag.PostTitle = posts.title;
            ViewBag.PostContent = StripHTML(posts.content);
            ViewBag.PostImageUrl = "http://admin.laracroftfans.com/Images/Posts/" + posts.image;
            ViewBag.appId = posts.id;

            return View(posts);
        }

        [HttpPost]
        public JsonResult SeeMorePosts(int id)
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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public string StripHTML(string input)
        {
            return Regex.Replace(input, "<.*?>", String.Empty);
        }
    }
}
