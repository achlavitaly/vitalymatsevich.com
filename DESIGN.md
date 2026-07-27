# Design system: vitalymatsevich.com

**North star: the operational field manual.**

The site argues that ecommerce work is one connected operating system rather than a résumé checklist. Its world is a near-black working surface marked with warm paper type, oxidized-copper signals, ruled evidence bands, and a lifecycle dial built from operational notation.

## Typography

Three voices, one job each.

| Role | Face | Used for |
|---|---|---|
| Display | Frank Ruhl Libre 500 | Hero thesis, section statements, case titles, method steps |
| Body | IBM Plex Sans 400/500/600 | Prose, navigation, actions, capability tags |
| Notation | JetBrains Mono 400/500 | Metrics, field labels, project indices, diagram labels, eyebrows, identity mark |

**The measured-things rule.** Monospace is reserved for anything that is counted, labelled, or read off an instrument. It never sets prose. Mono as a costume for "technical" is the failure mode being avoided; mono on measurements is what it is for.

**The one-claim rule.** The serif makes the claim, the sans explains it, the mono proves it. A heading never explains and a label never argues.

Display type is medium weight, tracked at `-0.015em`, with leading near 1.0. Do not simulate impact with heavier weights.

### Why this pairing

Frank Ruhl Libre was cut for Israeli newspapers, which gives an operator based in Tel Aviv a real reason to use it rather than a fashionable one. It is also uncommon in this context, which matters because the previous pairing (Unbounded with Manrope) read as a generic startup landing page and actively fought the field-manual concept.

### Scale

Notation sizes come from four tokens (`--t-micro`, `--t-note`, `--t-dense`, `--t-body`). The file previously carried 30 distinct sizes between 0.53rem and 1rem, many separated by 0.01rem and none perceptually distinct. Add a token before adding a size.

## Colour

Tokens in `:root`. Copper (`--signal`) marks meaning throughout the dark field, and the contact section is the only large copper area.

Because that section inverts the palette, anything placed on it must invert too: the accent action stays the filled ink button and supporting actions become outlined. A copper control on copper is invisible, and so is the default copper focus ring, which is why `.contact-section a:focus-visible` overrides it.

## Motion

**One authored moment: the lifecycle dial.** It is the page's argument, so it is the only element that earns a loop. Two ruled tick bands drift in opposite directions at instrument speed while a copper signal walks the seven stages in order, so the diagram reads as a cycle that is running rather than a labelled circle.

Everything else is quiet feedback: arrows translate 4px, actions scale to 97%, project rows and method steps reveal once on entry.

Rules that must hold:

- The loop pauses when scrolled offscreen, driven by `app.js`. It runs by default, so a failed script costs animation and never a broken diagram.
- Reduced motion must clear `animation-delay` as well as duration. A stagger otherwise holds elements in their start state for the full delay, which is the thing being opted out of.
- Nothing animates layout. Transform, colour and shadow only.

## Layout

Content is capped at 1460px. Sections are separated by deep vertical pauses and organised by hairline rules rather than cards or panels.

**The dial needs a wider column than the dial itself.** Its labels ride outside the rings, so the map is sized `min(100% - 140px, 340px)` to reserve that room. Sizing it to fill its column clips the easternmost label against `main`'s overflow clip, silently, at some widths and not others. Verify label fit at 1440, 1280, 1041, 1040, 430 and 360 after any change here.

**The portrait is centred on phones and ratio-driven below 1040px.** An explicit height plus a full-width column letterboxes a square source; `height: auto` lets the declared 4:5 ratio take over.

## Do not

- Replace the three-voice split with a single neutral sans.
- Set prose in the monospace, or metrics in the body face.
- Convert project evidence into rounded cards.
- Add gradients, glass, or shadows outside the scrolled header.
- Use circles for anything but the system diagram; here a circle means a connected system.
- Add decorative motion beside the dial. If a second thing loops, the dial stops being the moment.
