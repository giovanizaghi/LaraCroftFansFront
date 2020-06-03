using System.Web;
using System.Web.Optimization;

namespace LaraCroftFansClient
{
    public class BundleConfig
    {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui.min.js",
                        "~/Scripts/slick.min.js",
                        "~/Scripts/AjaxCalls.js",
                        "~/Scripts/HomePageController.js",
                        "~/Scripts/moment.js",
                        "~/Scripts/new-menu.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            // pronto para a produção, utilize a ferramenta de build em https://modernizr.com para escolher somente os testes que precisa.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/jquery-ui.min.css",
                      "~/Content/jquery-ui.theme.min.css",
                      "~/Content/font-awesome.css",
                      "~/Content/slick.css",
                      "~/Content/slick-theme.css",
                      "~/Content/article-format.css",
                      "~/Content/PagedList.css",
                      "~/Content/Articles.css",
                      "~/Content/new-menu.css",
                      "~/Content/article-exibition.css"
                      ));
        }
    }
}
