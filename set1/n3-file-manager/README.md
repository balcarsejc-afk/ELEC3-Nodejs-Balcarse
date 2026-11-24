# N3 File Manager

Run from this folder:
```bash
node index.js list
node index.js create diary.txt "Today I practiced Node.js"
node index.js read diary.txt
node index.js update diary.txt "I learned fs and path"
node index.js delete diary.txt
```
On first run, the program creates `files/` and three starter text files (`snacks.txt`, `tasks.txt`, `ideas.txt`). All managed paths are built with `path.join()`.
