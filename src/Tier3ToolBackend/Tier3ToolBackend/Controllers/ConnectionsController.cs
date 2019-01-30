using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Tier3ToolDataAccess;

namespace Tier3ToolBackend.Controllers
{
    public class HandlerDelete
    {
        public int id { get; set; }
    }

    [RoutePrefix("tier3/connections")]
    public class ConnectionsController : ApiController
    {
        private ToolTier3DbEntities db = new ToolTier3DbEntities();

        [Route("get")]
        public IQueryable<Connection> GetConnections()
        {
            return db.Connections;
        }

        [ResponseType(typeof(Connection))]
        public IHttpActionResult GetConnection(int id)
        {
            Connection connection = db.Connections.Find(id);
            if (connection == null)
            {
                return NotFound();
            }

            return Ok(connection);
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutConnection(Connection connection)
        {
            int id = connection.Id;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != connection.Id)
            {
                return BadRequest();
            }

            db.Entry(connection).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConnectionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("create")]
        [HttpPost]
        [ResponseType(typeof(Connection))]
        public IHttpActionResult PostConnection(Connection connection)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Connections.Add(connection);
            db.SaveChanges();

            return CreatedAtRoute("Tier3Tool", new { id = connection.Id }, connection);
        }

        [Route("delete")]
        [HttpDelete]
        [ResponseType(typeof(Connection))]
        public IHttpActionResult DeleteConnection([FromBody] HandlerDelete handlerDelete )
        {
            Connection connection = db.Connections.Find(handlerDelete.id);
            if (connection == null)
            {
                return NotFound();
            }

            db.Connections.Remove(connection);
            db.SaveChanges();

            return Ok(connection);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ConnectionExists(int id)
        {
            return db.Connections.Count(e => e.Id == id) > 0;
        }
    }
}