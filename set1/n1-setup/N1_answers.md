# N1 Answers — Package Management

**Full name:** JC Argel Balcarse  
**Section:** IV-BSIT-A

1. **name** — Pangalan ng project na ginagamit din ng npm para makilala ito.
2. **version** — Version number ng project; tumutulong malaman kung anong release ang ginagamit.
3. **description** — Maikling paliwanag kung para saan ang project.
4. **main** — Entry file na default na tinutukoy ng package kapag ginagamit bilang module.
5. **scripts** — Mga shortcut command na puwedeng patakbuhin gamit ang `npm run` o `npm start`.
6. **dependencies** — Packages na kailangan ng application habang ginagamit ito.
7. **devDependencies** — Packages na kailangan habang nagde-develop o nagte-test, gaya ng nodemon.
8. **node_modules** — Dito inilalagay ng npm ang installed packages at dependencies nila. Hindi ito isinasama sa submission dahil malaki ito at puwedeng buuin ulit gamit ang `npm install` mula sa package.json/package-lock.json.

**Note:** I-run ang `npm install` sa folder na ito para mabuo ang package-lock.json at node_modules sa sarili mong computer. Huwag i-commit ang node_modules.
