import { Button } from "../buttons/Button";
import VideoComponent from "../video/Video";
import { Dialog } from "./Dialog";
import { Meta } from "@storybook/react";
import React, { useState } from "react";

export default {
  component: Dialog,
  title: "Components/Dialog",
} as Meta;

export const Simple = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        this is a dialog
      </Dialog>
    </div>
  );
};

export const Info = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <div className="prose">
          <h2>What’s Included</h2>
          <p>
            Read here what’s included in the product. You can also include other
            things.
          </p>

          <ul>
            <li>Do thing 1</li>
            <li>Do thing 2</li>
            <li>Do more things…</li>
          </ul>

          <Button label="Try now" icon="external-link" iconPosition="before" />
        </div>
      </Dialog>
    </div>
  );
};

export const Text = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <div className="prose">
          <h2>What’s Included</h2>
          <p>
            Hey there where ya goin’, not exactly knowin’, who says you have to
            call just one place home. He’s goin’ everywhere, B.J. McKay and his
            best friend Bear. He just keeps on movin’, ladies keep improvin’,
            every day is better than the last. New dreams and better scenes, and
            best of all I don’t pay property tax. Rollin’ down to Dallas, who’s
            providin’ my palace, off to New Orleans or who knows where. Places
            new and ladies, too, I’m B.J. McKay and this is my best friend Bear.
          </p>
          <p>
            Mutley, you snickering, floppy eared hound. When courage is needed,
            you’re never around. Those medals you wear on your moth-eaten chest
            should be there for bungling at which you are best. So, stop that
            pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop
            that pigeon, stop that pigeon, stop that pigeon. Howwww! Nab him,
            jab him, tab him, grab him, stop that pigeon now.
          </p>

          <Button label="Try now" icon="external-link" iconPosition="after" />

          <h3>And more</h3>

          <p>
            Hong Kong Phooey, number one super guy. Hong Kong Phooey, quicker
            than the human eye. He’s got style, a groovy style, and a car that
            just won’t stop. When the going gets tough, he’s really rough, with
            a Hong Kong Phooey chop (Hi-Ya!). Hong Kong Phooey, number one super
            guy. Hong Kong Phooey, quicker than the human eye. Hong Kong Phooey,
            he’s fan-riffic!
          </p>
          <p>
            Thundercats are on the move, Thundercats are loose. Feel the magic,
            hear the roar, Thundercats are loose. Thunder, thunder, thunder,
            Thundercats! Thunder, thunder, thunder, Thundercats! Thunder,
            thunder, thunder, Thundercats! Thunder, thunder, thunder,
            Thundercats! Thundercats!
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export const Video = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>

      <Dialog onOpenChange={setIsOpen} open={isOpen} mode="video">
        <VideoComponent provider="youtube" videoId="bTqVqk7FSmY" autoPlay />
      </Dialog>
    </div>
  );
};
