using System;

namespace LaraCroftFansClient.Models
{
    [Serializable]
    public class PostsDTO
    {
        public int idpost { get; set; }
        public string title { get; set; }
        public string name { get; set; }
        public int iduser { get; set; }
        public DateTime postdate { get; set; }
        public string image { get; set; }
        public string description { get; set; }
        public string content { get; set; }
        public int tagId { get; set; }
        public int page { get; set; }
    }
}