export default function go(rover, instructions) {
  return Array.from(instructions).reduce((robot, instruction) => {
    if (robot.status === 'fail') {
      return { ...robot };
    }

    if (instruction === 'R') {
      if (robot.facing === 'N') return { ...robot, facing: 'E' };

      if (robot.facing === 'E') { return { ...robot, facing: 'S' }; }

      if (robot.facing === 'S') return { ...robot, facing: 'W' };

      if (robot.facing !== 'N' && robot.facing !== 'E' && robot.facing !== 'S' && robot.facing !== 'W') {
        console.log('Rover is flipped. Mission abort.');

        return { ...robot, facing: 'U', status: 'fail' };
      }

      return { ...robot, facing: 'N' };
    }

    if (instruction === 'L') {
      if (robot.facing === 'N') return { ...robot, facing: 'W' };

      if (robot.facing === 'W') return { ...robot, facing: 'S' };

      if (robot.facing === 'S') return { ...robot, facing: 'E' };

      if (robot.facing !== 'N' && robot.facing !== 'E' && robot.facing !== 'S' && robot.facing !== 'W') {
        console.log('Rover is flipped. Mission abort');

        return { ...robot, facing: 'U', status: 'fail' };
      }

      return { ...robot, facing: 'N' };
    }

    if (instruction === 'F') {
      if (robot.facing === 'N') return { ...robot, position: { ...robot.position, y: robot.position.y + 1 } };

      if (robot.facing === 'E') return { ...robot, position: { ...robot.position, x: robot.position.x + 1 } };

      if (robot.facing === 'S') return { ...robot, position: { ...robot.position, y: robot.position.y - 1 } };

      if (robot.facing !== 'N' && robot.facing !== 'E' && robot.facing !== 'S' && robot.facing !== 'W') {
        console.log('Rover is flipped. Mission abort');

        return { ...robot, facing: 'U', status: 'fail' };
      }

      return { robot, position: { ...robot.position, x: robot.position.x - 1 } };
    }

    if (instruction === 'B') {
      if (robot.facing === 'N') return { ...robot, position: { ...robot.position, y: robot.position.y - 1 } };

      if (robot.facing === 'E') return { ...robot, position: { ...robot.position, x: robot.position.x - 1 } };

      if (robot.facing === 'S') return { ...robot, position: { ...robot.position, y: robot.position.y + 1 } };

      if (robot.facing !== 'N' && robot.facing !== 'E' && robot.facing !== 'S' && robot.facing !== 'W') {
        console.log('Rover is flipped. Mission abort');

        return { ...robot, facing: 'U', status: 'fail' };
      }

      return { rover, position: { ...rover.position, x: rover.position.x + 1 } };
    }

    return { ...rover };
  }, rover);
}
