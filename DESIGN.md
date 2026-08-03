# Design system: vitalymatsevich.com

**North star: the creative operator's field manual.**

The site argues that commercial creative and e-commerce operations are one connected practice rather than separate résumé categories. Its world is a near-black working surface marked with warm paper type, oxidized-copper signals, ruled evidence bands, and real work from live brands.

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

The work is the authored moment. The opening composition and gallery use real commercial assets. Nothing loops or enters automatically.

Everything else is quiet feedback: arrows translate 4px and actions scale to 97%.

Rules that must hold:

- Reduced motion must clear `animation-delay` as well as duration. A stagger otherwise holds elements in their start state for the full delay, which is the thing being opted out of.
- Nothing animates layout. Transform, colour and shadow only.

## Layout

Content is capped at 1460px. Sections are separated by deliberate but compact vertical pauses and organised by hairline rules rather than cards or panels.

The hero pairs the positioning statement with one Fox and Raven product mockup. It establishes the visual world without competing with the creative gallery below. On phones the composition stays visible instead of disappearing, because visual evidence is the point of the page.

The portfolio gallery is asymmetrical on larger screens and becomes one continuous column on phones. Captions describe the commercial role of each asset rather than decorating it with aesthetic language.

The full-width storefront caption keeps its label and explanation on opposite sides of one evidence line. The three smaller gallery pieces stack the explanation below the notation label and align both to the reading edge. This prevents narrow cards from turning short evidence statements into right-aligned text blocks while preserving the wide-card treatment where it has enough room.

Mobile spacing uses three relationships rather than one repeated pause: 32 pixels joins directly related sections, 42 pixels is the default section interval, and 56 pixels introduces a major body of work. The hero evidence flows into the profile snapshot, the gallery action flows into the method, and the role-fit conclusion flows into the About heading at the related interval. Role-fit rows reduce their display scale and mute supporting copy on phones. The closing role-fit statement is omitted below 680 pixels because it repeats the process conclusion and competes with the stronger About heading.

**The portrait follows the full content width on phones and stays ratio-driven below 1040px.** The shared left edge keeps personal photography consistent with the project evidence above it. At tablet widths the portrait remains capped, while `height: auto` lets the declared 4:5 ratio control the crop.

## Do not

- Replace the three-voice split with a single neutral sans.
- Set prose in the monospace, or metrics in the body face.
- Convert project evidence into rounded cards.
- Add gradients, glass, or shadows outside the scrolled header.
- Use rounded cards, pills, or interface chrome around the work.
- Add decorative loops. Motion should help the visitor notice evidence, then stop.
