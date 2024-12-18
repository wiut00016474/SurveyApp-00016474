﻿using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SurveyApp.Models;

//16474
namespace SurveyApp.Data
{
    public class SurveyDbContext : DbContext
    {
        public SurveyDbContext(DbContextOptions<SurveyDbContext> options) : base(options)
        {
        }

        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Response> Responses { get; set; }
    }
}