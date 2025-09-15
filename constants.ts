import { SportCategory } from './types';

export const SPORT_CATEGORIES: SportCategory[] = [
  {
    name: 'Football (Soccer)',
    image: 'https://cdn.pixabay.com/photo/2014/10/14/20/24/ball-488718_1280.jpg',
    prompt: `Generate 6 different realistic, photorealistic images of soccer. 
Each image should be unique (different scene, camera angle, and moment):
1) A generic player kicking a ball into the net while the goalkeeper dives.
2) A player celebrating a goal with arms raised and confetti.
3) A goalkeeper making a fingertip save.
4) A dramatic low-angle shot of the ball entering the net under floodlights.
5) A wide stadium shot with cheering fans.
6) A close-up of a boot striking a wet ball with water spray.
Do NOT depict real people, celebrities, team logos, or copyrighted kit designs. Use generic athletes and jerseys. Cinematic lighting, ultra-detailed, 8k.`
  },
  {
    name: 'Basketball',
    image: 'https://cdn.pixabay.com/photo/2017/06/18/17/10/basketball-2416463_1280.jpg',
    prompt: `Generate 6 different realistic, photorealistic images of basketball. 
Scenes:
1) A player performing a slam dunk mid-air.
2) A three-point shooter releasing the ball.
3) A defender blocking a shot at the rim.
4) A fast-break layup with motion blur.
5) A wide arena shot with cheering fans and lights.
6) A close-up of hands spinning a basketball on a finger.
No real people, no logos, no brands. Cinematic lighting, high detail, 8k.`
  },
  {
    name: 'Tennis',
    image: 'https://cdn.pixabay.com/photo/2020/11/27/18/59/tennis-5782695_1280.jpg',
    prompt: `Generate 6 different realistic, photorealistic images of tennis. 
Scenes:
1) A player hitting a forehand with motion blur on the racket strings.
2) A powerful serve toss at its peak.
3) A volley exchange at the net.
4) A clay-court slide with dust in the air.
5) A wide shot of the court with scoreboard in the background.
6) A close-up of the tennis ball compressing on racket strings.
No real people, no logos, no brands. Cinematic, ultra-detailed, 8k.`
  },
  {
    name: 'Cricket',
    image: 'https://cdn.pixabay.com/photo/2023/12/12/09/26/cricket-8444899_1280.jpg',
    prompt: `Generate 6 different realistic, photorealistic images of cricket. 
Scenes:
1) A batsman playing a cover drive.
2) A bowler mid-delivery stride.
3) A wicketkeeper diving to stop the ball.
4) A fielder catching near the boundary.
5) A wide stadium shot with cheering fans.
6) A close-up of the bat striking the ball with particles flying.
Do not depict real players, logos, or brands. Cinematic, ultra-detailed, 8k.`
  },
  {
    name: 'Athletics',
    image: 'https://cdn.pixabay.com/photo/2019/07/14/22/14/running-4338238_1280.jpg',
    prompt: `Generate 6 different realistic, photorealistic images of athletics (track and field). 
Scenes:
1) Sprinters exploding out of starting blocks.
2) A hurdler clearing a hurdle in mid-air.
3) A photo finish at the finish line with motion blur.
4) A long jumper landing in sand.
5) A wide stadium shot of multiple runners.
6) A close-up of spikes digging into the red track.
No real people, no logos, no brands. Cinematic, high detail, 8k.`
  },
  {
    name: 'Swimming',
    image: 'https://cdn.pixabay.com/photo/2013/02/09/04/23/swimmers-79592_1280.jpg',
    prompt: `Generate 6 different realistic, photorealistic images of swimming. 
Scenes:
1) A swimmer diving off the starting blocks.
2) A butterfly stroke underwater with bubbles.
3) A swimmer making a flip turn at the wall.
4) A freestyle swimmer mid-stroke above water.
5) A wide pool shot with multiple lanes.
6) A close-up of droplets spraying off a swimmer’s arm.
No real people, no logos, no brands. Cinematic lighting, underwater clarity, 8k.`
  },
];

export const LOADING_MESSAGES = [
    "Powering up the digital stadium...",
    "Lacing up the virtual boots...",
    "Adjusting the camera lens for the perfect shot...",
    "Briefing the AI creative director...",
    "Rendering pixels into passion...",
    "Capturing the winning moment...",
];