# Project 1 tutorial — simple version

Open `index.html` to view the tutorial. This version has plain styling, eight short pages, direct comparisons between six studies, diagrams, and a three-slide activity. There is no quiz or narration.

The slideshow is included because the assignment requires an interactive activity and explicitly allows a slideshow you create.

The site now includes six figures extracted from the actual papers: AIFit Figures 1 and 6, SiTrEx Figures 1 and 9, and FormCoach Figures 3 and 4. Captions credit each source, and the images can be clicked to view full size. Two simple original diagrams remain for camera views and angle histograms. Figure source details are recorded in `images/SOURCES.md`.

To publish on GitHub Pages, upload this folder's HTML files, `style.css`, `slideshow.js`, `images/`, and `.nojekyll` to the repository root. Select that branch and root folder in the repository's Pages settings. All links are relative.

To change wording, edit the corresponding HTML section in `content/`, then run `py build.py`. This refreshes the pages while preserving the layout and navigation. The generated root HTML files work independently; neither `content/` nor `build.py` is needed for hosting.

## Explaining the review

Use one main point per page:

1. **Introduction:** these studies judge exercise form and feedback; they are not just pose-estimator comparisons.
2. **Camera assumptions:** the same goal is tested with different visibility and hardware constraints.
3. **Simple methods:** rules are traceable, and learned angle features can be competitive for stable poses.
4. **Movement analysis:** classification and reference matching preserve motion but have different data and reference requirements.
5. **Feedback:** clear wording does not guarantee a correct fault diagnosis.
6. **Results:** new users, new exercises, phone timing, and useful corrections need different tests.
7. **Conclusions:** take the specific successes and weaknesses into Project 2 rather than choosing a winner from accuracy alone.

The detailed results remain cited, but the presentation can explain the comparisons without reciting every number. The slideshow reinforces three of these conclusions. The bibliography is supporting material rather than something to read aloud in full.

Still to do for submission:

- Add your recorded narration to each page.
- Rehearse `Project 1 Presentation.pptx` and `Project 1 Presentation Script.md` in the parent folder, then record the required YouTube presentation using both the slides and website.
- Publish the site and test its public URL.

The original `github-pages` version has been left intact.
