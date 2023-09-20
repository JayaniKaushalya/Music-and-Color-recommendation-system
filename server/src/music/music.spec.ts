import { Test, TestingModule } from '@nestjs/testing';
import { Music } from './music.schema';

describe('Music', () => {
  let provider: Music;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Music],
    }).compile();

    provider = module.get<Music>(Music);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
