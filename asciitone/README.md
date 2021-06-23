# ascii-tone

### Created by John DeTora

#### Made with vanilla HTML/CSS and [Tone.js](https://github.com/Tonejs/Tone.js)

Welcome to ascii-tone, a web based FM Synth and step sequencer with a 100% text based user interface.

This project is in the early development period and there are a lot of features planned. I am a relatively new developer and this is my sandbox for learning and experimenting.

ascii-tone runs best on google chrome or mozilla firefox, but will also work with many mobile devices.
See a live demo [here](www.echocoast.net/asciitone/index.html)

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

## Instructions

### Sequencer

ANSIquencer is the note input device for ascii-tone. It is made up of 8 steps with flutter (repeats) and snooze (rest) controls for each.

1. ANSIquencer starts with the [play] button. Press this button to start the sequencer. Press the animated tempo indicator to pause the sequencer.
2. The playhead is a visual indicator for seeing the current step being played.
3. The note input sliders are used for selecting which notes to play. Click or click and drag to the desired note position. The default note range is C3 to A4.
4. To set the scale for the note input sliders, click the [scale] button to select major, minor, pentatonic, or chromatic scale.
5. Below the note input sliders are the flutter meters. By default the step will play 1 time each pass. Setting this higher will repeat the step n amount of times up to 4 repeats.
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

-   Engage the [waveform] button to see all available waveform options. Click again to select the new waveform.
-   To enable glide, click the glide box. Note that you may need to adjust the decay amount of the primary envelope generator in order to hear the effects.
    -- [ ] = glide disabled
    -- [@] = glide enabled
-   The cross fader (labeled 'osc <> mod') controls the level blending of the carrier and modulator operators before reaching the lpf section. By default, only the primary carrier osc is heard.

### mod osc

The $mod osc section controls the secondary (modulation) operator's waveform and frequency ratio. Use this to change the timbre of te final output.

-   Engage the [waveform] button to see all available waveform options. Click again to select the new waveform.
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

The $lfo controls the modulation of the $filter section's cutoff. Note that the effect will be more apparent the more that the cutoff control is lowered.

### There are several known issues and things to note:

-   Google chrome may think the page is in portuguese. Do not translate it.
-   The flutter (repeat) values are somewhat tempo dependant. If the tempo is too high or too low, repeats may not be heard.
-   The lfo is uni-polar and only connects to the filter cutoff right now. This means that the filter cutoff must be set relatively low in frequency in order to hear the lfo doing its thing. If the decay is set to a low value, this will be even less noticeable.
-   Similarly, the glide control will only work if the decay is set low enough.
-   The volume get slightly louder and then quiet again when the waveforms are set to anything but sine. I'm not sure why, so just consider it a quirk
