# ascii-tone

#### Created by John DeTora with [Tone.js](https://github.com/Tonejs/Tone.js)

Welcome to ascii-tone, a web based FM Synth and step sequencer with a 100% text based user interface.

This project is in the early development period and there are a lot of features planned. I am a relatively new developer and this is my sandbox for learning and experimenting.

ascii-tone runs best on google chrome or mozilla firefox, but will also work with many mobile devices.
See a live demo [here](www.echocoast.net/asciitone/index.html)

## About

ascii-tone is inspired by the west coast synthesis paradigm. At its heart, ascii-tone is a 2 operator FM synthesizer routed through a low pass filter to encourage a broad range of tones. It aims to be a unique instrument that is simple and compact.

Specifications:

-   one main oscillator with sine, triangle, sawtooth, and square waveform selection11
-   Simple glide/portamento on/off
-   one modulation oscillator with waveform selection, and frequency ratio to determine the pitch
-   A crossfader that controls the final output level of the main oscillator and the modulation oscillator respectively
-   2 dedicated Attack - Decay envelopes used for shaping each oscillator's amplitude
-   1 low pass filter with frequency cutoff and resonance parameters
-   1 lfo hard wired to the low pass filter filter cutoff
-   8 step sequencer with energy and snooze per step

## Instructions

### Sequencer

ANSIquencer is the note input device for ascii-tone. It is made up of 8 steps with energy (repeats) and snooze (rest) controls for each.

1. ANSIquencer starts with the [play] button. Press this button to start the sequencer. Press the animated tempo indicator to pause the sequencer.
2. The playhead is a visual indicator for seeing the current step being played.
3. The note input sliders are used for selecting which notes to play. Click or click and drag to the desired note position. The current note range is C3 to F4.
4. Below the note input sliders are the energy meters. By default the step will play 1 time each pass. Setting this higher will repeat the step n amount of times up to 4 repeats.
5. Below the energy meters are the #snooze toggle switches. Click these to toggle rest on or off for that step.

### Synthesizer

Block Diagram

<pre>
  ┌─────────┐  ┌─────────┐  ┌─────────┐             
  │         │  │         │  │         │             
  │         │  │         │  │         │             
  │  osc    │→→│   env   │→→│   lpf   │→ → → →               
  │         │  │         │  │         │      ↓      
  │   fm    │  │         │  │         │      ↓      
  └─────────┘  └─────────┘  └─────────┘    ┌───┐    
       ↑                         ↑         │ c │    
       ↑                         ↑         │ r │    
       ↑  ┌──────┐               ↑         │ o │    
       ↑  │ mod  │               ↑         │ s │    
        ← │index │ ←             ↑         │ s │→ → [ final output ] 
          └──────┘  ↑            ↑         │ f │    
                    ↑            ↑         │ a │    
                    ↑            ↑         │ d │    
                    ↑            ↑         │ e │    
  ┌─────────┐  ┌─────────┐  ┌─────────┐    │ r │    
  │         │  │         │  │         │    └───┘    
  │         │  │         │  │         │      ↑      
  │ mod osc │→→│ mod env │  │   lfo   │      ↑      
  │         │  │         │  │         │      ↑      
  │         │  │         │  │         │      ↑      
  └─────────┘  └─────────┘  └─────────┘      ↑      
                    ↓                        ↑      
                    → → → → → → → → → → → → →       
</pre>

### There are several known issues and things to note:

-   Google chrome may think the page is in portuguese. Do not translate it.
-   The energy (repeat) values are somewhat tempo dependant. If the tempo is too high or too low, repeats may not be heard.
-   The lfo is uni-polar and only connects to the filter cutoff right now. This means that the filter cutoff must be set relatively low in frequency in order to hear the lfo doing its thing. If the decay is set to a low value, this will be even less noticeable.
-   Similarly, the glide control will only work if the decay is set too low.
-   The volume get slightly louder and then quiet again when the waveforms are set to anything but sine. I'm not sure why, so just consider it a quirk
-   The FX page is just getting started. the delay works but you'll see that the GUI gets messed up when on this pag
