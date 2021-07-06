# ascii-tone

#### Created with HTML/CSS/JS and the [Tone.js](https://github.com/Tonejs/Tone.js) library.

Welcome to ascii-tone, an FM Synth and step sequencer with a 100% text based user interface.

ascii-tone runs best on google chrome or mozilla firefox, but will also work with many mobile devices.
See a live demo [here](www.echocoast.net/asciitone/index.html)

### Quick Start

1. Getting started with ascii-tone couldn't be simpler. First make sure your device's audio is enabled (turn your phone off silent!) and adjust your volume so that it's not too loud.
2. Click or tap the \[ play \] button and enjoy. You can start adjusting the controls by clicking parts of the sliders, or by clicking and dragging.
3. Mobile Pro tip: Tap a parameter and continue to hold it to the screen while dragging your finger below the parameter. This makes it so you can see the parameter being adjusted without your finger being in the way. This is especially useful when adjusting some of the smaller controls.
4. play. asciitone is about exploring synthesis and sketching sounds. Be aware that your settings won't save once you leave the page.

## About

ascii-tone is inspired by the west coast synthesis paradigm. At its heart, ascii-tone is a 2 operator FM synthesizer routed through a low pass filter to encourage a broad range of tones. It aims to be a unique instrument that is simple and compact.

Specifications:

-   one main oscillator with sine, triangle, sawtooth, and square waveform selection
-   Simple glide/portamento on/off
-   one modulation oscillator with waveform selection, and frequency ratio to determine the pitch
-   A crossfader that controls the final output level of the main oscillator and the modulation oscillator respectively
-   2 dedicated Attack - Decay envelopes used for shaping each oscillator's amplitude
-   1 low pass filter with frequency cutoff and resonance parameters
-   1 lfo hard wired to the low pass filter filter cutoff
-   8 step sequencer with flutter and snooze per step

### Sequencer

ANSIquencer is the note input device for ascii-tone. It is made up of 8 steps with flutter (repeats) and snooze (rest) controls for each.

1. ANSIquencer starts with the [play] button. Press this button to start the sequencer. Press the animated tempo indicator to pause the sequencer.
2. The playhead is a visual indicator for seeing the current step being played.
3. The note input sliders are used for selecting which notes to play. Click or click and drag to the desired note position. The default note range is C3 to A4.
4. To set the scale for the note input sliders, click the [scale] button to select major, minor, pentatonic, or chromatic scale.
5. Below the note input sliders are the flutter meters. By default the step will play 1 time each pass. Setting this higher will repeat the step n amount of times up to 4 repeats. Note: The flutter values are somewhat tempo dependant. If the tempo is too high or too low, all repeats may not be heard.
6. Below the flutter meters are the #snooze toggle switches. Click these to toggle rest on or off for that step.

### Synthesizer

Block Diagram

<pre>
         
  ┌─────────┐   ┌─────────┐   ┌─────────┐             
  │         │   │         │→ →│  osc    │             
  │         │   │         │   │         │             
  │   OSC   │→ →│   ENV   │   │  CROSS  │               
  │         │   │         │   │  FADER  │→  →            
  │ fm      │   │         │   │         │     ↓     
  └─────────┘   └─────────┘   │ mod osc │     ↓     
   ↑                          └─────────┘     ↓
   ↑                            ↑             ↓
   ↑  ┌──────┐           →  →  →         ┌─────────┐     
   ↑  │ mod  │          ↑                │         │
    ← │index │ ← ←      ↑                │   LPF   │ → [ final output ] 
      └──────┘    ↑     ↑            → → │fm       │ 
                  ↑     ↑           ↑    └─────────┘      
                  ↑     ↑           ↑          
                  ↑     ↑           ↑           
  ┌─────────┐   ┌─────────┐    ┌─────────┐       
  │2        │   │         │    │         │      
  │         │   │         │    │         │            
  │ MOD OSC │→ →│ MOD ENV │    │   LFO   │            
  │         │   │         │    │         │           
  │         │   │         │    │         │            
  └─────────┘   └─────────┘    └─────────┘       
</pre>

### osc

The $osc section controls the primary (carrier) operator as well as the blending of the carrier and modulator signal levels.

-   Engage the [waveform] button to rotate through the waveform options.
-   To enable glide, click the glide box. Note that you may need to adjust the decay amount of the primary envelope generator in order to hear the effects.
    -- [ ] = glide disabled
    -- [@] = glide enabled
-   The cross fader (labeled 'osc <> mod') controls the level blending of the carrier and modulator operators before reaching the lpf section. By default, only the primary carrier osc reaches the final output.

### mod osc

The $mod osc section controls the secondary (modulation) operator's waveform and frequency ratio. Use this to change the timbre of te final output.

-   Engage the [waveform] button to rotate through the waveform options.
-   Move the |freq ratio| to raise the frequency of $mod osc, thus changing the ratio between the carrier operator's frequency and the modulation operator's frequency.

### envelope

The $envelope section controls the amplitude of the carrier oscillator with a simple attack/decay envelope.

-   Note that changes here will be more apparent the more that the tempo is lowered.

### mod envelope

The $mod env section controls the amplitude of the modulator oscillator with >mod index controlling the total amount that the modulator will influence the carrier's frequency.

### filter

The $filter section allows you to adjust the low pass filter's frequency cutoff and resonance, changing the timbre of the final output by cutting out higher frequencies.

-   Adjust the >cutoff control to raise or lower the amount of high frequencies that are allowed to pass.
-   Adjust the >resonance to change the 'quality' of the frequency band.

### lfo

The $lfo modulates the the selected destination with a constant wave. By default, [filter] modulates the $filter's cutoff. Note that the effect will be more apparent the more that the cutoff control is lowered.

### effects

Click the fx tab to see all effects controls. Click the synth tab to switch views back to the synth controls.

### delay

-   time:
-   feedback:
-   mix:

### reverb

-   decay:
-   pre-delay:
-   mix:
