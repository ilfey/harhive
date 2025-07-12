import { clsx } from "clsx";
import { box, descriptionList } from "generated/patterns";
import { text } from "generated/recipes";
import { ComponentProps } from "react";
import { Accordion } from "./Accordion";
import { AccordionItem } from "./Accordion/Accordion";
import { BlockCode } from "./BlockCode";

export const DocumentationPage = () => {
	return (
		<>
			<h1 className={text({ size: "h1", color: "accent" })}>
				Документация API
			</h1>

			<h2 className={text({ size: "h2", color: "accent" })}>Введение</h2>

			<p className={text()}>
				Harhive API - это удобный способ управлять контентом и получать к нему
				доступ. Все данные получаются с помощью GET запросов, ответ приходит в
				виде JSON массивов
			</p>

			<h2 className={text({ size: "h2", color: "accent" })}>
				Получение изображений (action=get_images)
			</h2>

			<p className={text()}>
				Самый простой пример запроса, который выводит 5 случайных изображений:
				<BlockCode>
					https://harhive.pp.ua/api/v3?action=get_images&amp;sort=random&amp;limit=5
				</BlockCode>
			</p>

			<h3 className={text({ size: "h3", color: "accent" })}>
				Основные параметры
			</h3>

			<dl className={descriptionList()}>
				<dt>
					<Code>?action</Code>
				</dt>

				<dd
					className={box({
						ml: 5,
					})}
				>
					главный параметр, указывает, что мы хотим получить. Он должен быть
					обязательно. Доступные значения: <Code>get_images</Code>,{" "}
					<Code>get_artists</Code>, <Code>get_characters</Code>
				</dd>

				<dt>
					<Code>limit</Code>
				</dt>
				<dd>количество элементов в ответе. По умолчанию 50</dd>

				<dt>
					<Code>sort</Code>
				</dt>
				<dd>
					указывает тип сортировки. Например, <Code>random</Code> для случайной
					выдачи или <Code>id_desc</Code> для вывода от новых к старым
				</dd>

				<dt>
					<Code>artist</Code>
				</dt>
				<dd>фильтрует изображения по имени автора</dd>

				<dt>
					<Code>character</Code>
				</dt>
				<dd>фильтрует изображения по имени персонажа</dd>

				<dt>
					<Code>search</Code>
				</dt>
				<dd>используется для поиска по спискам авторов и персонажей</dd>

				<dt>
					<Code>fields=all</Code>
				</dt>
				<dd>
					если указан, для изображений будет возвращена полная информация (id,
					filename, artists, characters)
				</dd>
			</dl>

			<p
				className={clsx(
					box({
						mt: 2,
					}),
					text(),
				)}
			>
				Это основной эндпоинт для получения изображений. Он очень гибкий и
				позволяет комбинировать параметры для получения нужного результата. По
				умолчанию возвращает только список названий файлов
			</p>

			<Accordion className={box({ mt: 4 })}>
				<AccordionItem open summary="Выдать 10 случайных изображений">
					<p className={text()}>
						Это аналог вашего <Code>img-rand</Code>. Используется{" "}
						<Code>sort=random</Code>.<br />
						<BlockCode>
							https://harhive.pp.ua/api/v3?action=get_images&amp;sort=random&amp;limit=10
						</BlockCode>
					</p>
				</AccordionItem>

				<AccordionItem summary="Выдать изображение с ID 1317 и получить всю информацию о нём">
					<p className={text()}>
						Это аналог вашего <Code>img-get</Code>. Используется фильтрация по
						ID и параметр <Code>fields=all</Code>.<br />
						<BlockCode>
							https://harhive.pp.ua/api/v3?action=get_images&amp;from_id=1317&amp;to_id=1317&amp;fields=all
						</BlockCode>
					</p>
				</AccordionItem>

				<AccordionItem summary="Выдать список из 20 изображений для второй страницы">
					<p className={text()}>
						Это аналог вашего <Code>img-list</Code> с пагинацией. Сортируем по
						ID от новых к старым (<Code>id_desc</Code>) и используем параметр{" "}
						<Code>page</Code>.<br />
						<BlockCode>
							https://harhive.pp.ua/api/v3?action=get_images&amp;sort=id_desc&amp;limit=20&amp;page=2
						</BlockCode>
					</p>
				</AccordionItem>

				<AccordionItem
					summary={
						'Найти 5 изображений с персонажем "nahida (genshin impact)" от автора "azbchan1221"'
					}
				>
					<p className={text()}>
						Пример комбинирования фильтров.
						<br />
						<BlockCode>
							https://harhive.pp.ua/api/v3?action=get_images&amp;character=nahida
							(genshin impact)&amp;artist=azbchan1221&amp;limit=5
						</BlockCode>
					</p>
				</AccordionItem>
			</Accordion>

			<h2 className={text({ size: "h2", color: "accent" })}>
				Получение списка авторов (action=get_artists)
			</h2>

			<p className={text()}>
				Выдаёт список авторов с пагинацией и сортировкой. Доступные значения для{" "}
				<Code>sort</Code>: <Code>name_asc</Code> (по умолчанию),{" "}
				<Code>name_desc</Code>, <Code>id_asc</Code>, <Code>id_desc</Code>
			</p>

			<Accordion className={box({ mt: 4 })}>
				<AccordionItem
					open
					summary="Получить третью страницу списка авторов (по 15 на странице), отсортированных по дате добавления"
				>
					<BlockCode>
						https://harhive.pp.ua/api/v3?action=get_artists&amp;sort=id_desc&amp;limit=15&amp;page=3
					</BlockCode>
				</AccordionItem>

				<AccordionItem
					summary={
						'Найти авторов, в имени которых есть "yama", и отсортировать по алфавиту'
					}
				>
					<BlockCode>
						https://harhive.pp.ua/api/v3?action=get_artists&amp;search=yama&amp;sort=name_asc
					</BlockCode>
				</AccordionItem>
			</Accordion>

			<h2 className={text({ size: "h2", color: "accent" })}>
				Получение списка персонажей (action=get_characters)
			</h2>

			<p className={text()}>
				Выдаёт список персонажей с пагинацией и сортировкой. Доступные значения
				для <Code>sort</Code>: <Code>name_asc</Code> (по умолчанию),{" "}
				<Code>name_desc</Code>, <Code>id_asc</Code>, <Code>id_desc</Code>
			</p>

			<Accordion className={box({ mt: 4 })}>
				<AccordionItem
					open
					summary="Получить первую страницу списка персонажей (30 на странице),
          отсортированных по имени в обратном порядке"
				>
					<BlockCode>
						https://harhive.pp.ua/api/v3?action=get_characters&amp;sort=name_desc&amp;limit=30&amp;page=1
					</BlockCode>
				</AccordionItem>

				<AccordionItem
					summary={
						'Найти персонажей, в имени которых есть "miku", и отсортировать по ID'
					}
				>
					<BlockCode>
						https://harhive.pp.ua/api/v3?action=get_characters&amp;search=miku&amp;sort=id_asc
					</BlockCode>
				</AccordionItem>
			</Accordion>
		</>
	);
};

const Code = (props: ComponentProps<"code">) => (
	<code
		className={clsx(
			box({
				bgColor: "neutral.800",
				p: 1,
				borderRadius: "md",
			}),
			text({ font: "mono", color: "accent" }),
		)}
		{...props}
	/>
);

export default DocumentationPage;
