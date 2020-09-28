import React, { FC } from 'react'
import { Button, Typography, Stack, Link } from '@island.is/island-ui/core'
import IconBullet from '../IconBullet/IconBullet'
import { getLinkProps } from '@island.is/web/utils/links'
import { LinkedPage } from '@island.is/web/graphql/schema'

import * as styles from './StoryList.treat'

export interface StoryProps {
  logoUrl: string
  label: string
  title: string
  intro: string
  readMoreText: string
  link?: string
  page?: LinkedPage
}

export interface StoryListProps {
  readMoreText: string
  stories: StoryProps[]
}

export const StoryList: FC<StoryListProps> = ({ readMoreText, stories }) => (
  <Stack space={8}>
    {stories.map((story, i) => (
      <Story key={i} {...story} />
    ))}
    {/* stories.length > 0 && (
      <div className={styles.margin}>
        <Button variant="ghost" white>
          {readMoreText}
        </Button>
      </div>
    ) */}
  </Stack>
)

const Story: FC<StoryProps> = ({
  logoUrl,
  label,
  title,
  intro,
  readMoreText,
  page,
  link,
}) => {
  const linkProps = page ? getLinkProps(page) : null

  const props = {
    ...(link && { href: link }),
    ...(linkProps && { ...linkProps }),
  }

  return (
    <div className={styles.margin}>
      <div className={styles.icon}>
        <IconBullet variant="gradient" image={logoUrl} />
      </div>
      <Stack space={2}>
        <Typography variant="eyebrow" color="white">
          {label}
        </Typography>
        <Typography variant="h2" as="h2" color="white">
          {title}
        </Typography>
        <Typography variant="p" color="white">
          {intro}
        </Typography>
        {!!(link || linkProps) && (
          <Link {...props} passHref pureChildren>
            <Button variant="text" size="medium" white icon="arrowRight">
              {readMoreText}
            </Button>
          </Link>
        )}
      </Stack>
    </div>
  )
}

export default StoryList
