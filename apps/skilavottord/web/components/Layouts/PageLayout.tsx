import React, { ReactNode, FC, useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { theme } from '@island.is/island-ui/theme'
import {
  Box,
  GridContainer,
  GridRow,
  GridColumn,
  Footer,
  ToastContainer,
} from '@island.is/island-ui/core'
import { useI18n } from '@island.is/skilavottord-web/i18n'
import FormStepperMobile from '../FormStepper/FormStepperMobile'
import FormStepper from '../FormStepper/FormStepper'
import * as styles from './PageLayout.treat'

interface PageProps {
  children: ReactNode
}

export const PageLayout: FC<PageProps> = ({ children }) => (
  <Box>
    <Box paddingY={[3, 3, 10, 10]}>
      <GridContainer>
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '8/12', '7/12']}
            offset={['0', '0', '1/12', '1/12']}
          >
            <Box paddingBottom={10}>{children}</Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
    <Footer />
  </Box>
)

interface ProcessPageProps extends PageProps {
  activeSection: number
  sectionType: string
  activeCar?: string
}

export const ProcessPageLayout: FC<ProcessPageProps> = ({
  children,
  sectionType = 'citizen',
  activeSection,
  activeCar,
}) => {
  const { width } = useWindowSize()

  const {
    t: { processes: t },
  } = useI18n()

  const sections = t[sectionType].sections.map((section) => {
    return { name: section }
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (width < theme.breakpoints.md) {
      return setIsMobile(true)
    }
    setIsMobile(false)
  }, [width])

  return (
    <Box
      paddingY={[0, 0, 10, 10]}
      background={isMobile ? 'white' : 'purple100'}
      className={styles.processContainer}
    >
      {isMobile && (
        <FormStepperMobile sections={sections} activeSection={activeSection} />
      )}
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '12/12', '9/12', '9/12']}>
            <Box
              paddingY={[3, 3, 6, 6]}
              background="white"
              borderColor="white"
              borderRadius="large"
              className={styles.processContent}
            >
              <GridColumn
                span={['9/9', '9/9', '10/12', '7/9']}
                offset={['0', '0', '1/12', '1/9']}
              >
                {children}
              </GridColumn>
            </Box>
          </GridColumn>
          <GridColumn span={['0', '0', '3/12', '3/12']}>
            {!isMobile && (
              <FormStepper
                title={t[sectionType].title}
                completedText={t[sectionType].completed}
                sections={sections}
                activeSection={activeSection}
                activeCar={activeCar}
              />
            )}
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

interface PartnerPageProps {
  children: ReactNode
  side: ReactNode
}

export const PartnerPageLayout: FC<PartnerPageProps> = ({ children, side }) => (
  <Box>
    <ToastContainer />
    <Box paddingY={[5, 5, 10, 10]}>
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '12/12', '4/12', '3/12']}>
            {side}
          </GridColumn>
          <GridColumn span={['12/12', '12/12', '8/12', '8/12']}>
            <Box paddingY={[5, 5, 0, 0]}>{children}</Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
    <Footer />
  </Box>
)

export const FormPageLayout: FC<PageProps> = ({ children }) => (
  <Box>
    <Box paddingY={10}>
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '12/12', '9/12', '9/12']}>
            {children}
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
    <Footer />
  </Box>
)
