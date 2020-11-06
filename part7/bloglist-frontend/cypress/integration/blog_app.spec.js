import blogService from "../../src/services/blogService";

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "root",
      name: "root",
      password: "rootpassword",
    });
  });

  describe("logging in", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000");
    });

    it("login form is shown", function () {
      cy.get("#loginform").find('input[name="Username"]');
      cy.get("#loginform").find('input[name="Password"]');
      cy.get("#loginform").find('button[type="submit"]');
    });

    it("login", function () {
      cy.get("#loginform").find('input[name="Username"]').type("root");
      cy.get("#loginform").find('input[name="Password"]').type("rootpassword");
      cy.get("#loginform").find('button[type="submit"]').click();

      cy.get("#loginform").should("not.exist");
    });

    it("incorrect login", function () {
      cy.get("#loginform").find('input[name="Username"]').type("wrong");
      cy.get("#loginform").find('input[name="Password"]').type("stuff");
      cy.get("#loginform").find('button[type="submit"]').click();

      cy.get("#loginform");
      cy.get('#notif:contains("Wrong credentials")').should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "root",
        password: "rootpassword",
      }).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
        cy.get("#toggle").click();
        cy.get('#newblog input[name="Title"]').type("sometitle");
        cy.get('#newblog input[name="Author"]').type("someauthor");
        cy.get('#newblog input[name="Url"]').type("someurl.com");
        cy.get('#newblog button:contains("create")').click();
        cy.get('.blogs:contains("sometitle")');
      });
    });

    it("A blog can be created", function () {
      cy.get('#notif:contains("A new blog was added successfully.")').should(
        "have.css",
        "color",
        "rgb(0, 128, 0)"
      );
    });

    it("A blog can be liked", function () {
      cy.get('.blogs button:contains("show")').click();
      cy.get('.blogs button:contains("show")').should("not.exist");
      cy.get('.blogs button:contains("hide")').should("exist");

      cy.get('.blogs button:contains("like")').click();

      cy.get(".blogs").contains("likes 1");

      cy.get('#notif:contains("likes updated")').should(
        "have.css",
        "color",
        "rgb(0, 128, 0)"
      );
    });

    it("A blog can be deleted", function () {
      cy.get('.blogs button:contains("show")').click();
      cy.get('.blogs button:contains("show")').should("not.exist");
      cy.get('.blogs button:contains("hide")').should("exist");

      cy.get('.blogs button:contains("remove")').click();
      cy.get(".blogs").should("not.exist");
    });

    it("Blogs are ordered according to likes", function () {
      cy.get(
        `.blogs:contains("sometitle someauthor") button:contains("show")`
      ).click();

      for (let i = 1; i < 4; i++) {
        cy.get("#toggle").click();
        cy.get('input[name="Title"]').type(`sometitle${i}`);
        cy.get('input[name="Author"]').type("someauthor");
        cy.get('input[name="Url"]').type(`${i}someurl.com`);
        cy.get('button:contains("create")').click();

        cy.get(
          `.blogs:contains("sometitle${i} someauthor") button:contains("show")`
        ).click();

        for (let j = 0; j < i; j++) {
          cy.get(`.blogs:contains("sometitle${i} someauthor")`).then((blog) => {
            const likesIndex =
              blog.text().search(new RegExp(/likes\s*\d+\s.like/, "g")) + 6;
            console.log(likesIndex);
            console.log(blog.text());

            blog.find('button:contains("like")').click();
            cy.get(`.blogs:contains("sometitle${i} someauthor")`).contains(
              `likes ${j + 1}`
            );
          });
        }

        let likes = Number.POSITIVE_INFINITY;
        cy.get(".blogs").each((blog) => {
          const likesIndex =
            blog.text().search(new RegExp(/likes\s*\d+\s.like/, "g")) + 6;
          const currentLikes = parseInt(blog.text().substring(likesIndex));

          expect(currentLikes).to.be.at.most(likes);

          likes = currentLikes;
        });
      }
    });
  });
});
